import json
import inspect

from src.exceptions import NBAApiException

async def make_http_request(session, method, endpoint):
    async with session.request(method, endpoint) as response:
        try:
            api_response = await response.json()
        except json.decoder.JSONDecodeError:
            raise NBAApiException()

        if response.status > 399:
            raise NBAApiException()

        return api_response


def error_handler(func):
    def inner_func(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except NBAApiException:
            return {'error': f'{func.__name__}({", ".join(args)}) error'}
    return inner_func

def inspect_class(nba_class):
    attributes = inspect.getmembers(nba_class, lambda a: not (inspect.isroutine(a)))
    params = [y for (x, y) in attributes if not ((x, y)[0].startswith('__') and (x, y)[0].endswith('__'))]
    return params