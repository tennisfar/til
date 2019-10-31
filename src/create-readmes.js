const fs = require('fs')
const del = require('delete')
const mkdirp = require('mkdirp')

const ignoreFilesAndFolders = [
  'src',
  'node_modules',
  '.git',
  '.gitignore',
  '.github',
  '.prettierrc',
  'package.json',
  'package-lock.json',
  'readme.md',
  'output',
]

const rootPath = process.cwd()
const outputPath = `${rootPath}/output`
del.sync([outputPath])
mkdirp(outputPath, function(err) {})

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
  let readmeTemplate = fs.readFileSync(`${rootPath}/readme.md`, 'utf8')

  readmeTemplate += `\n\n## Articles\n\n`

  folderNames.forEach(folderName => {
    mkdirp(`${outputPath}/${folderName}`, function(err) {})
    readmeTemplate += ` * [${folderName}](${folderName})\n`
  })

  const rootReadmeFile = `${outputPath}/readme.md`

  // create new readme
  fs.writeFileSync(rootReadmeFile, readmeTemplate)
}

const createReadmes = async function(folder, fileNames) {
  let readmeTemplate = `# ${folder}\n\n`

  fileNames.forEach(fileName => {
    const fileContent = fs.readFileSync(`${rootPath}/${folder}/${fileName}`, 'utf8')
    fs.writeFileSync(`${outputPath}/${folder}/${fileName}`, fileContent)
    readmeTemplate += `${fileContent}\n`
  })

  const readmeFile = `${outputPath}/${folder}/readme.md`

  // create new readme
  fs.writeFileSync(readmeFile, readmeTemplate)
}

;(async () => {
  const folderNames = await getFolderNames()

  await createRootReadme(folderNames)

  folderNames.forEach(async folder => {
    const fileNames = await getFileNamesInFolder(folder)
    await createReadmes(folder, fileNames)
  })
})()
