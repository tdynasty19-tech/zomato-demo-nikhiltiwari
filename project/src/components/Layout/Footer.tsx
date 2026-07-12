import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05070f] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div>
                <p className="text-xl font-bold text-white">BiteBox</p>
                <p className="text-sm text-slate-400">Premium food delivery</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-6">
              Discover the best food & drinks in your city with seamless delivery, curated collections, and a premium experience.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">About BiteBox</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">For Restaurants</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/partner" className="hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/apps" className="hover:text-white transition-colors">
                  Apps For You
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@bitebox.com</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-5 text-slate-400">
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 BiteBox. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
