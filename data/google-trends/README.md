# Google Trends data for the busy-season calendar

Monthly search interest for one search term per trade, exported from
trends.google.com (Explore → location **Austin TX** → **Past 5 years** →
download arrow on "Interest over time").

| File | Search term | Trade on the site |
| --- | --- | --- |
| ac-repair.csv | ac repair | HVAC |
| plumber.csv | plumber | Plumbing |
| electrician.csv | electrician | Electrical |
| roof-repair.csv | roof repair | Roofing |
| landscaping.csv | landscaping | Landscaping |
| pest-control.csv | pest control | Pest control |

To refresh the calendar: replace the files with new exports, then run

    npm run busy-season

and commit both the CSVs and `src/content/busy-season.json`.
