import string
import random

import importlib


def import_class(name):
    components = name.split('.')
    mod = importlib.import_module('.'.join(components[:2]))
    for comp in components[2:]:
        mod = getattr(mod, comp)
    return mod


def randstr(n=32):
    randlst = [random.choice(string.ascii_letters + string.digits) for i in range(n)]
    return ''.join(randlst)