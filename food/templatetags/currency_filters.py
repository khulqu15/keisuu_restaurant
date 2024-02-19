from django import template
import locale

register = template.Library()

@register.filter(name='yen')
def yen(value):
    try: 
        locale.setlocale(locale.LC_ALL, 'ja_JP.UTF-8')
        formatted_value = locale.currency(value, grouping=True, symbol=True)
        return formatted_value
    except (ValueError, locale.Error):
        return f"¥{value}"
