import { Heart, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-poppins)]">HealthAssist</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your comprehensive healthcare companion providing trusted medicine information, AI-powered health advice,
              and access to healthcare resources.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@healthassist.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold font-[family-name:var(--font-poppins)] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#medicine" className="hover:text-primary transition-colors">
                  Medicine Finder
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-primary transition-colors">
                  Health Dashboard
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-primary transition-colors">
                  Find Healthcare
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-primary transition-colors">
                  Health News
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold font-[family-name:var(--font-poppins)] mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 HealthAssist. All rights reserved. Built with care for your health.</p>
        </div>
      </div>
    </footer>
  )
}
