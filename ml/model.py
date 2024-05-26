import statsmodels.api as sm
from sklearn.ensemble import IsolationForest
import pandas as pd


def get_score(data: pd.DataFrame) -> pd.DataFrame:
    model = sm.tsa.statespace.SARIMAX(data.values, trend='c', order=(1, 1, 1)).fit()
    pred = model.predict(start=0, end=(len(data.values) - 1))
    data_to_class = data.values-pred
    clf = IsolationForest(random_state=0, contamination = 0.002).fit(pd.DataFrame(data_to_class))
    labels = clf.predict(pd.DataFrame(data_to_class)) < 0
    data.y = labels
    return data


def get_anomaly(data: dict) -> (str, dict):
    table_id = data['tabel_id']
    metric_name = data['name']
    points = data['points']
    to_predict = pd.DataFrame.from_records(points, index = ['x'])

    new_points = get_score(to_predict)
    result = {
        'points': {int(point['x']): int(point['y']) for point in new_points.to_records()},
        'is_ready': 1
    }
    return table_id, result
