# Minnesota Court Dockets Scraper

A simple web interface and wikiscraper for grabbing court dockets from: http://www.mnd.uscourts.gov/CourtCalendars.shtml

WikiScraper is here: https://scraperwiki.com/scrapers/minnesota_us_district_courts/

# Notes:
wikiscraper.py is just a local copy of the code on WikiScraper so we don't lose it. This means it may not always be completely up to date in our repository, but I'll try to remember to keep them the same.

# Necessary to do:
- Fix date formatting
- Make it prettier

# Pie in the sky:
- Figure out a way to get context for these cases (hopefully..)
- Control of SQL statements (search for a particular term, court, date, etc.)
- Twitter/email when updates are found
- Run the scraper more than once a day (not possible with WikiScraper, run our own?)