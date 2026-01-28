import json

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