# DateTime File Renamer

Simple Node script that renames files to match their last modified time-stamp.

The aim of this script is to rename an entire directory of files. Each file's new filename will be constructed from the file's last modified timestamp.

For example a file called `photo.jpeg` last modified on 23/06/2020 at 19:30 will be renamed to `2020_06_23-19_30_00.jpeg`.

**WARNING** - this script is destructive. Existing files will be replaced with the renamed version. It is recommended you run this script on a copy of your files to avoid losing your original files.

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

`directory` - **optional** directory path containing the files you want to rename (e.g `/c/dev/files`). If absent the `target` subdirectory under this script will be chosen.


### Run from command line

```
./renamer.js --fileType=txt --directory=/c/dev/files/
```