const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>  {
  // const likes = blogs.map( blog => blog.likes)
  // console.log(likes)
  // const totalLikes = likes.reduce( (sum, num) => {
  //   return sum + num
  // }, 0)
  // return totalLikes

  const totalLikes = blogs.reduce( (sum, blog) => {
    console.log("in reduce", sum, blog.likes)
    return sum + blog.likes
  }, 0)

  return totalLikes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce( (favorite, blog) => {
    // console.log("in reduce", favorite, blog)
    if (favorite == 0) return blog
    return favorite.likes > blog.likes ? favorite : blog
  }, 0)

  console.log('favorite is ', favorite)
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}