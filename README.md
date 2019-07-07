# md-links-naap

## Install

` npm install --save md-links-naap`

### Usage


##### CLI (Command Line Interface)


`md-links-naap(path, options)`



##### Read Markdown(.md) file


```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md

href: http://www.example.com
text: this is an example
file: .some/example.md`
```

##### Option: validate

```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md --validate

href: http://www.example.com
text: this is an example
file: .some/example.md
status: 200
statusText: OK
```

##### Option: stat

```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md --stats

Links total:1, Links uniques: 1
```


##### Opition: validate y stats

```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md --validate

href: http://www.example.com
text: this is an example
file: .some/example.md
status: 200
statusText: OK

links total:1, Links uniques: 1
```
