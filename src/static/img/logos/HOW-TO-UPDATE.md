# How to update these logos

As you might have noticed, the logos in this folder have dates in their names.
This is necessary in order to reflect changes despite browser caching. Normally,
Docusaurus handles this for us, but these logos are included in a way that
evades those mechanisms.

Therefore, every time the logos are updated, their names must be changed. When
you decide to change one of the files, just set the filename's date to the
current date. This is only important for all deployments, not for local
development (meaning the images will never be cached locally but they might be
on a Vercel preview.)
