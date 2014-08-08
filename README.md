protohype
=========

Installation
------------
Local DNS Setup
----------------
Open the file `/etc/hosts` and add `127.0.0.1       protohype.local` to the end of the file.


Web Server Setup
----------------
### Apache Setup

To setup apache, setup a virtual host to point to the public/ directory of the
project and you should be ready to go! It should look something like below:

    <VirtualHost *:80>
        ServerName protohype.local
        DocumentRoot /path/to/protohype/public
        SetEnv APPLICATION_ENV "development"
        <Directory /path/protohype/public>
            DirectoryIndex index.php
            AllowOverride All
            Order allow,deny
            Allow from all
        </Directory>
    </VirtualHost>
