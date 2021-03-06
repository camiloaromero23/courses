import re

from bs4 import BeautifulSoup

ITEM_HTML = ''' < html > <head > </head > <body >
<li class = "col-xs-6 col-sm-4 col-md-3 col-lg-3" >
    <article class = "product_pod" >
            <div class = "image_container" >
                    <a href = "catalogue/a-light-in-the-attic_1000/index.html" > <img src = "media/cache/2c/da/2cdad67c44b002e7ead0cc35693c0e8b.jpg" alt = "A Light in the Attic" class = "thumbnail" > </a >
            </div >
                <p class = "star-rating Three" >
                    <i class = "icon-star" > </i >
                    <i class = "icon-star" > </i >
                    <i class = "icon-star" > </i >
                    <i class = "icon-star" > </i >
                    <i class = "icon-star" > </i >
                </p >
            <h3 > <a href = "catalogue/a-light-in-the-attic_1000/index.html" title = "A Light in the Attic" > A Light in the ... < /a > </h3 >
            <div class = "product_price" >
        <p class="price_color">£51.77</p>
<p class="instock availability">
    <i class="icon-ok"></i>
        In stock
</p>
    <form>
        <button type="submit" class="btn btn-primary btn-block" data-loading-text="Adding...">Add to basket</button>
    </form>
            </div>
    </article>
</li>
</body></html>
'''


class ParsedItemLocators:
    NAME_LOCATOR = 'article.product_pod h3 a'
    PRICE_LOCATOR = 'article.product_pod p.price_color'
    RATING_LOCATOR = 'article.product_pod p.star-rating'


class ParsedItem:
    """ A class to take in an HTML page (or part of it) and find properties of an item in it """

    def __init__(self, page) -> None:
        self.soup = BeautifulSoup(page, 'html.parser')

    def name_attr(self, attr: str):
        item_link = self.soup.select_one(ParsedItemLocators.NAME_LOCATOR)
        item_attr = item_link.attrs[attr]
        return (item_attr)

    def price(self):

        item_price = self.soup.select_one(
            ParsedItemLocators.PRICE_LOCATOR).string

        pattern = '£([0-9]+\.[0-9]+)'
        matcher = re.match(pattern, item_price)
        return (matcher.group(0))
        return (float(matcher.group(1)))

    def rating(self):
        item_rating_tag = self.soup.select_one(
            ParsedItemLocators.RATING_LOCATOR)
        classes = item_rating_tag.attrs['class']
        rating_classes = [r for r in classes if r != 'star-rating']
        return (rating_classes[0])


item = ParsedItem(ITEM_HTML)
print(item.name_attr('title'))
print(item.name_attr('href'))
print(item.price())
print(item.rating())
