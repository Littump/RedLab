## можно отправить в редис тестовые данные, чтобы посмотреть, как они туда залетают
## python3 test.py

import json
from redis_settings import rds


points = [(i, i) for i in range(10)]

data = {
    'table_id': '123',
    'name': 'metric',
    'points': [{'x': point[0], 'y': point[1]} for point in points],
    'is_ready': 0,
}

keys = rds.keys('tabel-*')
print(keys)
