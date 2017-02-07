# Manage feed application (widget)
Authored by Sergey Ksenofontov (ksenofontovsa@ya.ru)

## Howto:
Install all necessary dependencies:
```
  npm install
  npm start
```

You can connect to app via url: http://localhost:1234/

API endpoint located in app/config/index.js file.

Enjoy!

## Example data to add new feed
Url: http://preisexporte.apobyte.de/www.eurapon.de/preissuchmaschine/preissuchmaschine.csv
Name: first
Delimiter: \t
Id field index: 0
Price field index: 3
From line: 1

Url: http://www.apodiscounter.de/partnerprogramme/krn.csv
Name: second
Delimiter: ;
Id field index: 0
Price field index: 1
From line: 1

## Requirements
  - NodeJS >= v6.5
