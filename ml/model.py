def func1(data):
    ...

def func2(data):
    ...

def get_anomaly(data):
    tabel_id = data['tabel_id']
    metric_name = data['name']
    points = data['points']
    
    metric_to_model = {
        'web_response': func1,
        ...
    }

    new_points = metric_to_model[metric_name](points)
    result = {
        'points': {point['x']: point['anomaly'] for point in new_points},
        'is_ready': True
    }
    return tabel_id, result
