
# RutMaterial for ReactiveForm Angular

Simple input RUT with MaterialAngular, 
validations, format & errors


## Reference


| Parameter | Default    | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `formParent`| <FormGroup> | `<FormGroup>` | **Required**. parent FormBuilder  |
| `label`|'Ingrese su RUT' | `string` | **Required**. text on label |
| `name`|'rut' | `string` | **Required**. unique 'name' of control  |
| `value`| ''| `string ` | Optional. to set initial value on input |
| `placeholder`| '12.345.678-9'| `string`  | Optional. placeholder on input |
| `disabled`| false | `boolean` | Optional. if control is disabled |
| `readonly`| false | `boolean` | Optional. if control is readonly |
| `required`| false | `boolean` | Optional. if control is required |
| `appearance`| 'outline'| `'fill', 'legacy', 'outline', 'standard'` | Optional. appearance of 'mat-form-field' |
| `floatLabel`| 'auto'| `'auto', 'always', 'never'` | Optional. appearance of 'Label' |
| `hint`| false | `string, boolean` | Optional. show mat-hint|
| `classField`| '' | `string` | Optional. set class to add style to 'mat-form-field' |
| `classHint`| ''| `string` | Optional. set class to add style to 'mat-hint' |
| `paste`| true| `boolean` | Optional. enable or disabled paste on input |
| `autocomplete`| on| `'on', 'off'` | Optional. if input have autocomplete form |
| `errorRequired`| 'El RUT es requerido' | `string` | Optional. set message to required error |
| `errorInvalid`| 'El Rut es inválido'| `string` | Optional. set message to Invalid error |
| `errorCustom`| false | `string, boolean` | Optional. set message to custom error |



  
## Installation

```bash
  ng add @angular/material
  npm i @numetalsour/rut-material
  
  add "RutMaterialModule" to your "imports" in x.module.ts 
  add "FormsModule" to your "imports" in x.module.ts

  Check styles.x if you have
  @import "~@angular/material/prebuilt-themes/indigo-pink.css"
  or another
```
HTML:
```bash
<form (ngSubmit)="onSubmint()">
<rut-material
    [name]="'rut_empresa'"
    [value]="value"
    [label]="'Ingrese su RUT'"
    [formParent]="formExample"
    [required]="true"
></rut-material>

<button type="submit">click!</button>
</form>
```

Component:
```bash
formExample: FormGroup

constructor(private fb: FormBuilder) {
    this.formExample = this.fb.group({
        rut_empresa: ['', []],
    })
```


    


