const fs = require('fs')
const del = require('delete')
const ignoreFilesAndFolders = [
  '_',
  'node_modules',
  '.git',
  '.gitignore',
  '.prettierrc',
  'package.json',
  'package-lock.json',
  'ReadMe.md',
]

const rootPath = process.cwd()
del.sync(['./readme.md'])

const getFolderNames = async function() {
  const folderNames = []
  await new Promise((resolve, reject) => {
    const promise = fs.readdir(rootPath, function(err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err)
      }
      files.forEach(file => {
        if (!ignoreFilesAndFolders.includes(file)) folderNames.push(file)
      })
      resolve(promise)
    })
  })
  return folderNames
}

const getFileNamesInFolder = async function(folder) {
  const path = `${rootPath}/${folder}`
  const fileNames = []
  await new Promise((resolve, reject) => {
    const promise = fs.readdir(path, function(err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err)
      }
      files.forEach(file => {
        if (!ignoreFilesAndFolders.includes(file)) fileNames.push(file)
      })
      resolve(promise)
    })
  })
  return fileNames
}

const createRootReadme = async function(folderNames) {
  let readmeTemplate = fs.readFileSync(`${rootPath}/_/root-template.md`, 'utf8')

  readmeTemplate += `\n\n## Articles\n\n`

  folderNames.forEach(folderName => (readmeTemplate += ` * [${folderName}](${folderName})\n`))

  const rootReadmeFile = `${rootPath}/readme.md`

  // create new readme
  fs.writeFileSync(rootReadmeFile, readmeTemplate)
}

const createReadmes = async function(folder, fileNames) {}

;(async () => {
  const folderNames = await getFolderNames()

  await createRootReadme(folderNames)

  folderNames.forEach(async folder => {
    const fileNames = await getFileNamesInFolder(folder)
    await createReadmes(folder, fileNames)
  })
})()
