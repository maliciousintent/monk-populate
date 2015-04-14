
# monk-populate

[![Build Status](https://travis-ci.org/plasticpanda/monk-populate.svg?branch=master)](https://travis-ci.org/plasticpanda/monk-populate)  
[![NPM](https://nodei.co/npm/monk-populate.png)](https://nodei.co/npm/monk-populate/)


mongoose-like .populate method for co-monk.

For usage check the ```test``` folder.


## Example

```nodejs
var users = monk_db.get('users');
var allTweets = [
  { content: 'Foo bar', by: { _id: '742ce0fe0e512c9043a4b9af' }  },
  { content: 'Foo baz', by: { _id: '742ce0fe0e512c9043a4b9ag' }  },
];

// will expand the "by" field using the "by._id" as primary key
allTweets = yield populate(users, allTweets, [''], 'by._id');
```


## LICENSE

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

