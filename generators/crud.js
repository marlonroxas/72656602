const fs = require('fs')
const _ = require('lodash')
const replaceall = require('replaceall')
const pluralize = require('pluralize')

const createFile = (file_path, content) => {
  fs.stat(file_path, (err, stat) => {
		if (err == null) {
      console.log(file_path + ' EXISTS')
    } else if (err.code == 'ENOENT') {
      fs.writeFile(file_path, content, err => { 
        if (err) {
            return console.log(err)
        }
        console.log('CREATED ' + file_path)
      })
    } else {
      console.log('Some other error: ', err.code)
    }
  })
}

const uc_first = string => {
  return replaceall(' ', '',_.startCase(_.camelCase(string)))
}

const generateModules = directory => {
  // Modules
  let listContent = fs.readFileSync('./generators/template/Template/List.js', 'utf8')
  listContent = replaceall('Templates', pluralize.plural(uc_first(directory)), listContent)
  listContent = replaceall('Template', pluralize.singular(uc_first(directory)), listContent)
  listContent = replaceall('template', _.kebabCase(directory).toLowerCase(), listContent)

  let formContent = fs.readFileSync('./generators/template/Template/Form.js', 'utf8')
  formContent = replaceall('Templates', pluralize.plural(directory), formContent)
  formContent = replaceall('Template', pluralize.singular(directory), formContent)
  formContent = replaceall('template', _.kebabCase(directory).toLowerCase(), formContent)

  const validationsContent = fs.readFileSync('./generators/template/Template/validations.js', 'utf8')

  directory = './client/src/components/modules/' + uc_first(directory)

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  createFile(directory + '/List.js', listContent)
  createFile(directory + '/Form.js', formContent)
  createFile(directory + '/validations.js', validationsContent)
}

const generateActions = (fileName, constants) => {
  let content = fs.readFileSync('./generators/template/Template.actions.js', 'utf8')
  content = replaceall('TEMPLATES', pluralize.plural(constants.toUpperCase()), content)
  content = replaceall('TEMPLATE', pluralize.singular(constants.toUpperCase()), content)

  content = replaceall('Templates', pluralize.plural(uc_first(fileName)), content)
  content = replaceall('Template', pluralize.singular(uc_first(fileName)), content)

  content = replaceall('templates', pluralize.plural(fileName.toLowerCase()), content)
  content = replaceall('template', pluralize.singular(fileName.toLowerCase()), content)

  createFile('./client/src/redux/actions/' + uc_first(fileName) + '.actions.js', content)
}

const generateReducers = (fileName, constants) => {
  let content = fs.readFileSync('./generators/template/Template.reducers.js', 'utf8')
  content = replaceall('TEMPLATES', pluralize.plural(constants.toUpperCase()), content)
  content = replaceall('TEMPLATE', pluralize.singular(constants.toUpperCase()), content)
  
  content = replaceall('Templates', pluralize.plural(uc_first(fileName)), content)
  content = replaceall('Template', pluralize.singular(uc_first(fileName)), content)

  content = replaceall('templates', pluralize.plural(fileName.toLowerCase()), content)
  content = replaceall('template', pluralize.singular(fileName.toLowerCase()), content)

  createFile('./client/src/redux/reducers/' + uc_first(fileName) + '.reducers.js', content)
}

const generateRoutes = fileName => {
  let content = fs.readFileSync('./generators/template/Template.js', 'utf8')

  content = replaceall('TEMPLATES', pluralize.plural(fileName.toUpperCase()), content)
  content = replaceall('TEMPLATE', pluralize.singular(fileName.toUpperCase()), content)
  
  content = replaceall('Templates', pluralize.plural(uc_first(fileName)), content)
  content = replaceall('Template', pluralize.singular(uc_first(fileName)), content)

  content = replaceall('templates', pluralize.plural(fileName.toLowerCase()), content)
  content = replaceall('template', pluralize.singular(fileName.toLowerCase()), content)

  createFile('./routes/' + uc_first(fileName) + '.js', content)
}

const generateEndpoints = fileName => {
  let content = fs.readFileSync('./generators/template/Template.endpoint.js', 'utf8')
  content = replaceall('TEMPLATES', pluralize.plural(fileName.toUpperCase()), content)
  content = replaceall('TEMPLATE', pluralize.singular(fileName.toUpperCase()), content)
  
  content = replaceall('Templates', pluralize.plural(uc_first(fileName)), content)
  content = replaceall('Template', pluralize.singular(uc_first(fileName)), content)

  content = replaceall('templates', pluralize.plural(fileName.toLowerCase()), content)
  content = replaceall('template', pluralize.singular(fileName.toLowerCase()), content)

  fs.appendFile('./endpoints/sitelab.js', content, err => {
    if (err) throw err
    console.log('Endpoints References CREATED')
  })
}

const generateConstants = fileName => {
  let content = fs.readFileSync('./generators/template/Template.constants.js', 'utf8')
  content = replaceall('TEMPLATES', pluralize.plural(fileName.toUpperCase()), content)
  content = replaceall('TEMPLATE', pluralize.singular(fileName.toUpperCase()), content)
  
  fs.appendFile('./client/src/constants.js', content, err => {
    if (err) throw err
    console.log('Constants CREATED')
  })
}

const generateImports = fileName => {
  // IMPORT COMPONENT ROUTES
  fs.readFile('./client/src/routes/index.js', 'utf8', function (err,data) {
    if (err) throw err
  
    let content = fs.readFileSync('./client/src/routes/index.js', 'utf8')
    
    const importRoute = 'import ' + fileName + 'List from \'../components/modules/' + fileName + '/List\'' + "\n" +
                        'import ' + fileName + 'Form from \'../components/modules/' + fileName + '/Form\'' + "\n" + 
                        '/**COMPONENT-IMPORT*/'

    content = replaceall('/**COMPONENT-IMPORT*/', importRoute, content)

    const createRoute = '<PrivateRoute exact path=\'/' + _.kebabCase(fileName) + '\' component={lhoc(' + fileName + 'List)} />' + "\n" +
                        '        <PrivateRoute exact path=\'/' + _.kebabCase(fileName) + '/form\' component={lhoc(' + fileName + 'Form)} />' + "\n" +
                        '        <PrivateRoute exact path=\'/' + _.kebabCase(fileName) + '/form/:id\' component={lhoc(' + fileName + 'Form)} />' + "\n" +
                        "        "+'{/**COMPONENT-ROUTE*/}'
    content = replaceall('{/**COMPONENT-ROUTE*/}', createRoute, content)

    fs.writeFile('./client/src/routes/index.js', content, 'utf8', function (err) {
      if (err) return console.log(err);
    })
  })

  // IMPORT REDUCERS
  fs.readFile('./client/src/redux/reducers/index.js', 'utf8', function (err,data) {
    if (err) throw err
  
    let content = fs.readFileSync('./client/src/redux/reducers/index.js', 'utf8')
    
    const importReducer = 'import * as ' + fileName + ' from \'./' + fileName + '.reducers\'' + "\n" + '/**COMPONENT-REDUCERS*/'
    content = replaceall('/**COMPONENT-REDUCERS*/', importReducer, content)
    
    const combineReducer = '...' + fileName + ',' + "\n  " + '/**COMPONENT-COMBINE-REDUCERS*/'
    content = replaceall('/**COMPONENT-COMBINE-REDUCERS*/', combineReducer, content)

    fs.writeFile('./client/src/redux/reducers/index.js', content, 'utf8', function (err) {
      if (err) return console.log(err);
    })
  })

  // IMPORT APP ROUTES
  fs.readFile('./app.js', 'utf8', function (err,data) {
    if (err) throw err
  
    let content = fs.readFileSync('./app.js', 'utf8')
    
    const importRoute = 'app.use(\'/api/' + fileName + '\', require(\'./routes/' + fileName + '\'))' + "\n" + '/**APP-ROUTE*/'
    content = replaceall('/**APP-ROUTE*/', importRoute, content)

    fs.writeFile('./app.js', content, 'utf8', function (err) {
      if (err) return console.log(err);
    })
  })
}

process.argv.forEach(function (resource, index, array) {
  if (index == 2) {
    const className = uc_first(_.kebabCase(resource))
    const constants = replaceall('-', '_', _.kebabCase(resource))

    generateConstants(constants)
    generateModules(className)
    generateActions(className, constants)
    generateReducers(className, constants)
    generateRoutes(className)
    generateEndpoints(className)
    generateImports(className)
  }
})
