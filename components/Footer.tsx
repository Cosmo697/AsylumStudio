import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-400">© 2023 Asylum Studio. All rights reserved.</div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

