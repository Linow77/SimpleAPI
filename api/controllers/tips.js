const Tips = require('../models/tips')

// GET
exports.getAllTips = async (req, res, next) => {
  try {
    const tips = await Tips.find()
    const response = {
      succes: true,
      count: tips.length,
      tips: tips.map(tips => {
        return {
          _id: tips._id,
          name: tips.name,
          description: tips.description
        }
      })
    }
    return res.status(200).json(response)
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: 'ErrorGettingAllsTips'
    })
  }
}

exports.getTipsById = async (req, res, next) => {
  try {
    const tips = await Tips.findById({ _id: req.params.tipsId })

    if (!tips) {
      return res.status(404).json({
        success: false,
        message: 'TipsNotFound'
      })
    }
    return res.status(200).json({
      succes: true,
      tips: tips
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: 'ErrorGettingTipsById'
    })
  }
}

exports.getTipsByName = async (req, res, next) => {
  let name = req.params.tipsName
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'ErrorAreaEmpty'
    })
  }

  try {
    // Search Bar conversion
    // let regexString = ''

    // // Add each character in lower and uppercase between [] to create the regex form
    // for (let i = 0; i < name.length; i++) {
    //   regexString = regexString + '[' + name[i].toLowerCase()
    //   regexString = regexString + name[i].toUpperCase() + ']'
    // }

    // // Create the regex
    // const regex = new RegExp(`${regexString}`)

    // const tips = await Tips.find({
    //   name: { $regex: regex }
    // })

    const tips = await Tips.find({ name: name })

    if (tips.length < 1) {
      return res.status(404).json({
        succes: false,
        message: 'ErrorNoTipsFound'
      })
    }
    return res.status(200).json({
      succes: true,
      tips: tips.map(tips => {
        return {
          _id: tips._id,
          name: tips.name,
          description: tips.description
        }
      })
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: 'ErrorGettingTipsByName'
    })
  }
}

//POST
exports.createTips = async (req, res, next) => {
  const { name, description } = req.body

  //check if all textarea are not empty
  if (name === '' || description === '') {
    return res.status(400).json({
      success: false,
      message: 'ErrorAreaEmpty'
    })
  }

  //check if tips already exist
  const tips = await Tips.findOne({ name })
  if (tips) {
    return res.status(409).json({
      success: false,
      message: 'ErrorAlreadyExist'
    })
  }

  try {
    // Create webinar
    const newTips = await Tips.create({
      name,
      description
    })

    return res.status(201).json({
      success: true,
      message: 'Tips created',
      tips: newTips
    })
  } catch (err) {
    return res.status(501).json({
      success: false,
      message: 'Error while creating tips'
    })
  }
}

//PUT
exports.updateTips = async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    description: req.body.description
  }

  try {
    // Check if all textarea are not empty
    if (fieldsToUpdate.name === '' || fieldsToUpdate.description === '') {
      return res.status(400).json({
        success: false,
        message: 'ErrorAreaEmpty'
      })
    }
    // Check if tips exist
    Check = await Tips.findById({ _id: req.params.tipsId })
    if (!Check) {
      return res.status(404).json({
        success: false,
        message: 'TipsNotFound'
      })
    }

    // Update tips
    tips = await Tips.findByIdAndUpdate(req.params.tipsId, fieldsToUpdate)
    return res.status(200).json({
      success: true,
      message: 'Tips update',
      newTips: tips
    })
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: 'TipsNotFound'
    })
  }
}

//DELETE
exports.deleteTips = async (req, res, next) => {
  try {
    // Check if tips exist
    Check = await Tips.findById({ _id: req.params.tipsId })
    if (!Check) {
      return res.status(404).json({
        success: false,
        message: 'TipsNotFound'
      })
    }

    //Update tips
    await Tips.findByIdAndDelete({ _id: req.params.tipsId })

    return res.status(200).json({
      succes: true,
      message: 'Tips deleted'
    })
  } catch (err) {
    res.status(500).json({
      sucess: false,
      error: err,
      message: 'ErrorDeletingTips'
    })
  }
}

// exports.webinarUpdate = async (req, res, next) => {
//   const fieldsToUpdate = {
//     name: req.body.name,
//     description: req.body.description,
//     miniature: req.body.miniature
//   }

//   try {
//     //check if all textarea are not empty
//     if (
//       fieldsToUpdate.name === '' ||
//       fieldsToUpdate.description === '' ||
//       fieldsToUpdate.miniature === ''
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'ErrorAreaEmpty'
//       })
//     }
//     //update webinar
//     webinar = await Webinar.findByIdAndUpdate(
//       req.params.webinarId,
//       fieldsToUpdate
//     )
//     return res.status(200).json({
//       success: true,
//       message: 'Webinar update'
//     })
//   } catch (err) {
//     return res.status(404).json({
//       success: false,
//       message: "Webinar doesn't exist"
//     })
//   }
// }

// exports.getAll = async (req, res, next) => {
//   try {
//     //find all user
//     const webinars = await Webinar.find()
//     const response = {
//       success: true,
//       count: webinars.length,
//       webinars: webinars.map(webinar => {
//         return {
//           _id: webinar._id,
//           name: webinar.name,
//           description: webinar.description,
//           video: webinar.video,
//           miniature: webinar.miniature
//         }
//       })
//     }
//     return res.status(200).json(response)
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err,
//       message: 'Error while getting webinars'
//     })
//   }
// }

// exports.getWebinarById = async (req, res, next) => {
//   try {
//     //find all user
//     const webinar = await Webinar.findById({ _id: req.params.webinarId })

//     if (!webinar) {
//       return res.status(404).json({
//         success: false,
//         message: 'Webinar not found'
//       })
//     }
//     return res.status(200).json({
//       succes: true,
//       webinar: webinar
//     })
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err,
//       message: 'Error while getting webinar'
//     })
//   }
// }

// exports.getWebinarByName = async (req, res, next) => {
//   try {
//     let name = req.params.webinarName
//     let regexString = ''

//     //add each character in lower and uppercase between [] to create the regex form
//     for (let i = 0; i < req.params.webinarName.length; i++) {
//       regexString = regexString + '[' + name[i].toLowerCase()
//       regexString = regexString + name[i].toUpperCase() + ']'
//     }

//     //create the regex
//     const regex = new RegExp(`${regexString}`)

//     const webinars = await Webinar.find({
//       name: { $regex: regex }
//     })

//     if (webinars.length < 1) {
//       return res.status(404).json({
//         success: false,
//         message: 'Webinar not found'
//       })
//     }
//     return res.status(200).json({
//       succes: true,
//       webinars: webinars
//     })
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err,
//       message: 'Error while getting webinar'
//     })
//   }
// }

// exports.webinarDelete = async (req, res, next) => {
//   try {
//     await Webinar.findByIdAndDelete({ _id: req.params.webinarId })

//     return res.status(200).json({
//       succes: true,
//       data: {},
//       message: 'Webinar deleted'
//     })
//   } catch (err) {
//     res.status(500).json({
//       sucess: false,
//       error: err,
//       message: 'Error while deleting webinar'
//     })
//   }
// }
