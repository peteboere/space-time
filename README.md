Human readable data size and time calculations.

````js
const spaceTime = require('space-time');
const bytes = spaceTime.bytes;
const ms = spaceTime.ms;

bytes('1mb');
bytes('12.5Mb');
bytes('1 gigabyte + 12MB');

ms('1h');
ms('1 hr and 30 mins');
ms('52w 5h 1d');
ms('52 weeks, 5 hours and 1 day to be precise');
````

Time functions support `Date.now()` relative calculations:

````js
ms.now('+1 week'); // Date.now() + ms('1 week')
seconds.now('-7 days'); // seconds(Date.now() - ms('7 days'))
````

Other size/time conversion units available:

````js
kilobytes('50 mb');
megabytes('100gb');
gigabytes('50 terabytes + 512mb');
terabytes('500mb');

seconds('1 year');
minutes('10 days');
hours('10000 seconds');
days('5.5 years');
weeks('49 days');
years('3 lunar months and 1024 days');
````
