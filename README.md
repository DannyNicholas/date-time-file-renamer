# DateTime File Renamer

Node script that renames files to match their last modified time-stamp.

The aim of this script is to rename an entire directory of files. Each file's new filename will be constructed from the file's last modified timestamp.

For example a file called `photo.jpeg` last modified on 23/06/2020 at 19:30 will be renamed to `2020-06-23 19_30_00.jpeg`.

The renaming of any file will be aborted if another file already exists whose name matches the planned file rename. 

In other words, a planned rename of a file to `2020-06-23 19_30_00.jpeg` will not happen if another file already exists with the same name. The original file will be left untouched.

**WARNING** - this script is destructive. Existing files will be replaced with the renamed version.

It is recommended you run this script on a copy of your files to avoid losing or corrupting your original files. Use at your own risk so please be careful.

### Install with Node Package Manager

```
npm install
```

### Run with Node

```
node renamer.js --fileType=txt --directory=/c/dev/files/
```

Additional parameters:

`fileType` - **mandatory** file type of all files you want to rename (e.g `jpeg` or `txt`). Any files of other types will be ignored.

`directory` - **optional** absolute path to the directory containing the files you want to rename (e.g `/user/me/files`). If absent the `files` subdirectory relative to the location of this script will be chosen.


### Run from command line

```
./renamer.js --fileType=txt --directory=/user/me/files/
```


### Additional Timestamp Updater

In order to repeat this process in reverse, a `timestamper` script has been included that will update each file's time-stamp to match the file name (assuming it already matches the 'YYYY-MM-DD HH_MM_SS' file name pattern).

This may be useful if a file has been modified and the original time-stamp has been reset.

For example, a file called `2020-06-23 19_30_00.jpeg` will be given a timestamp of `23/06/1972 19:30:00`.

Running the process is similar the one described above. For example:

```
node timestamper.js --fileType=txt --directory=/c/dev/files/
```
