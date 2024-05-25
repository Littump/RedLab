import redis


import os

from dotenv import load_dotenv


load_dotenv()


REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")

# redis = redis.StrictRedis(
#     host=config.REDIS_HOST,
#     port=config.REDIS_PORT,
#     password=config.REDIS_PASSWORD,
# )

redis = redis.StrictRedis(
    host="c-c9q6j9qrmmj9bc37ia46.rw.mdb.yandexcloud.net",
    port=6379,
    password='password',
)

record = {
    "name": "PythonRu",
    "description": "Redis tutorials",
    "website": "https://pythonru.com/"
}

redis.hset('business', record)

print(f"business: {redis.hgetall('business')}")