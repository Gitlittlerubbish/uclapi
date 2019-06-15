from django.core.management.base import BaseCommand
from django.conf import settings
import redis
import xml.etree.ElementTree as ET
from requests import get as rget


class Command(BaseCommand):

    help = 'Updates medium blogs on website'

    def handle(self, *args, **options):
        print("Getting latest medium articles")
        response = rget(url="https://medium.com/feed/ucl-api")
        root = ET.fromstring(response.text)
        medium_article_iterator = root.iter('item')

        print("Connecting to Redis")
        self._redis = redis.Redis(
            host=settings.REDIS_UCLAPI_HOST,
            charset="utf-8",
            decode_responses=True
        )
        pipe = self._redis.pipeline()
        print("Setting Blog keys")
        for i in range(0, settings.MEDIUM_ARTICLE_QUANTITY):
            article = next(medium_article_iterator)
            redis_key_url = "Blog:item:{}:url".format(i)
            redis_key_title = "Blog:item:{}:title".format(i)
            pipe.set(redis_key_url, article[1].text)
            pipe.set(redis_key_title, article[0].text)
        pipe.execute()
        print("Frontend updated to have latest medium blogs")
