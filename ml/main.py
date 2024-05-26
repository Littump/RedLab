import json
import time

from redis_settings import rds
from model import get_anomaly


def main():
    while True:
        keys = rds.keys('tabel-*')
        for key in keys:
            data_binary = rds.get(key)
            data = json.loads(data_binary)
            if data['is_ready']:
                continue

            table_id, points = get_anomaly(data)
            rds.set(f'tabel-{table_id}', json.dumps(points))

        time.sleep(1)


if __name__ == '__main__':
    main()
