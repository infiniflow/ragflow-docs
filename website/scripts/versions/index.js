const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const semver = require('semver');
const _ = require('lodash');

const writeFile = (file, data) => {
  fs.writeFileSync(file, data)
}

function keepLastNVersion(n) {
  const data = shell.exec('cd $RAGFLOW_MAIN && git tag').stdout.trim()
  const tags =  _.compact(data.split('\n'))
    .filter(semver.valid)
    .sort(semver.compare)
    .reverse();
  const groups = _.groupBy(tags, function(item){
    return semver.major(item) + '.' + semver.minor(item)
  })
  let got = 0;
  const res = [];
  for (const key in groups) {
    res.push(groups[key][0])
    got++
    if (got >= n) break
  }
  return res
}

const arr = keepLastNVersion(1)
writeFile('./versions.json', JSON.stringify(arr, null, 1))