import os

from dotenv import load_dotenv

import redis

load_dotenv()


REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
REDIS_SSL = os.getenv("REDIS_SSL")
REDIS_SSL_CA_CERTS = os.getenv("REDIS_SSL_CA_CERTS")

rds = redis.StrictRedis(
    host=REDIS_HOST,
    port=int(REDIS_PORT),
    password=REDIS_PASSWORD,
    ssl=(REDIS_SSL == "True"),
    ssl_ca_certs=REDIS_SSL_CA_CERTS,
)
