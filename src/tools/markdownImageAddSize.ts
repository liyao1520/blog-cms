const reg = /!\[(.*?)\]\((.*?)\)/g
const hasSizeReg = /\d+\*\d+$/
interface ImagesInfo {
  imageText: string
  title: string
  src: string
  naturalWidth?: number
  naturalHeight?: number
}
export default async function markdownImageAddSize(markdown: string) {
  const images: ImagesInfo[] = []
  markdown.replace(reg, replaceHelper)

  return await handleImageAll(images, markdown)

  function replaceHelper(
    imageText: string,
    title: string,
    src: string
  ): string {
    images.push({ imageText, title, src })
    return imageText
  }
}

async function handleImageAll(images: ImagesInfo[], markdown: string) {
  let res: string = markdown
  for (const img of images) {
    const { title, src, imageText } = img
    try {
      const { naturalWidth, naturalHeight } = await getImageNaturalInfo(src)

      let sizeInfo = ''
      //如果没有sizeInfo,则加sizeInfo
      if (!hasSizeReg.test(title)) {
        sizeInfo = `-${naturalWidth}*${naturalHeight}`
      }

      const newImageText = `![${title}${sizeInfo}](${src})`
      res = res.replaceAll(imageText, newImageText)
    } catch (e) {
      console.warn(`image ${img.src} error`)
    }
  }
  return res
}

function getImageNaturalInfo(src: string) {
  return new Promise<{
    naturalWidth: number
    naturalHeight: number
  }>((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = function () {
      const naturalWidth = img.naturalWidth
      const naturalHeight = img.naturalHeight
      resolve({
        naturalWidth,
        naturalHeight
      })
    }
    img.onerror = function (e) {
      reject(e)
    }
  })
}
