module.exports.getAppPath =async()=> {
    const { dirname } = require('path');
    const { constants, promises: { access } } = require('fs');
    
    for (let path of module.paths) {
      try {
        await access(path, constants.F_OK);
        return dirname(path);
      } catch (e) {
        // Just move on to next path
      }
    }
  }

