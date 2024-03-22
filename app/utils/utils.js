exports.deleteImageIfNeeded = (wood) => {
  if (wood.image != null) {
    fs.unlink('uploads/' + wood.image.match(/[^\/]+$/)[0], err => console.log(err))
  }
}