Tutorials. And stuff.


## License

Here's a human-readable format of the license we use for our content:

(Creative Commons BY-NC-SA license)[http://creativecommons.org/licenses/by-nc-sa/3.0/]

## Running

We use a library named `predis` for interacting with our database, so to run this, you need to use `pear` to install it:

    pear channel-discover pear.nrk.io
    pear install nrk/predis

You also need to have a Redis server running locally. You can change settings for it in /libs/Tutorials.class.php/line 34,
using predis' Predis\Client constructor.

## Credits

Libraries we use include Predis (https://github.com/nrk/predis/) and Peregrine (https://github.com/botskonet/Peregrine/).

Otherwise, this software is licensed under the GNU General Public License, more information in License,
by nasonfish <nasonfish@gmail.com>, with ideas and other cool stuff by puffrfish. Feel free to fork and submit bug fixes, or run your own version of this!