# md-links-naap

## Instalación

Intala tu *md-links-naap* con el siguiente comando

` npm install --save md-links-naap`

###Uso

##### CLI (Command Line Interface - Interfaz de Línea de Comando)


`md-links-naap(path, options)`


##### Leer archivos Markdown(.md)


```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md

href: http://www.example.com
text: this is an example
file: .some/example.md`
```

##### Opción: validate

```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md --validate

href: http://www.example.com
text: this is an example
file: .some/example.md
status: 200
statusText: OK
```

##### Opción: stat

```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md --stats

href: http://www.example.com
text: this is an example
file: .some/example.md

links-total:1
```


##### Opción: validate y stats

```
const md-links-naap = requiere('md-links-naap')

$ md-links-app example.md --validate

href: http://www.example.com
text: this is an example
file: .some/example.md
status: 200
statusText: OK

links-total:1
```

#### Test

```
npm test
```