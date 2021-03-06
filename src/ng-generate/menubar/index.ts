import { chain, Rule, noop, Tree } from '@angular-devkit/schematics';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
} from '@angular/cdk/schematics';
import { Schema } from './schema';

/**
 * Scaffolds a new menu bar component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({ ...options }),
    options['skipImport'] ? noop() : addComponentModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addComponentModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options) || null;
    if (modulePath) {
      addModuleImportToModule(host, modulePath, 'MenubarModule', 'primeng/menubar');
      addModuleImportToModule(host, modulePath, 'ButtonModule', 'primeng/button');
      addModuleImportToModule(host, modulePath, 'InputTextModule', 'primeng/inputtext');
    }
    return host;
  };
}
