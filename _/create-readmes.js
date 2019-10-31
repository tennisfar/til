const fs = require('fs')
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
  let readmeTemplate = fs.readFileSync(`${rootPath}/_/readme.md`, 'utf8')

  readmeTemplate += `\n\n## Articles\n\n`

  folderNames.forEach(folderName => (readmeTemplate += ` * [${folderName}](${folderName})\n`))

  const rootReadmeFile = `${rootPath}/readme.md`

  // delete old readme
  await new Promise((resolve, reject) => {
    const promise = fs.access(rootReadmeFile, err => {
      if (!err) {
        fs.unlinkSync(`${rootPath}/readme.md`)
        resolve(promise)
      } else {
        resolve(promise)
      }
    })
  })

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
