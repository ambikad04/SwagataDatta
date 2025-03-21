"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { motion } from "framer-motion"
import {
  ChevronDown,
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  GraduationCap,
  BookOpen,
  Award,
  Briefcase,
  Scale,
  FileText,
  BookMarked,
  Gavel,
  BookText,
  ScrollText,
  Users,
  Globe,
  Brain,
  Lightbulb,
  ExternalLink,
  FileUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { LogoCarousel } from "@/components/logo-carousel"
import { useTheme } from "next-themes"
import { toast } from "@/hooks/use-toast"
import { sendEmail } from "@/lib/actions"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Force a theme update on mount to ensure it's applied
    if (mounted) {
      const currentTheme = localStorage.getItem("theme") || "light"
      setTheme(currentTheme)
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["home", "about", "education", "experience", "skills", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted, setTheme])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const scrollToContactForm = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth",
      })
      // Focus on the first form field after scrolling
      setTimeout(() => {
        const nameInput = document.getElementById("name")
        if (nameInput) nameInput.focus()
      }, 800)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call the server action to send email
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Affiliation logos with real images
  const affiliationLogos = [
    { src: "/images/NTU.jpg", alt: "Nottingham Trent University", width: 200, height: 80 },
    { src: "/images/NLS-Legal.jpg", alt: "Nottingham Law School", width: 200, height: 80 },
    { src: "/images/BlueSky.png", alt: "BlueSky Education", width: 200, height: 80 },
    { src: "/images/leap.jpg", alt: "Leap Scholar", width: 200, height: 80 },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Logo size="md" />
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {["Home", "About", "Education", "Experience", "Skills", "Contact"].map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium ${
                  activeSection === item.toLowerCase()
                    ? "text-navy dark:text-blue-300 border-b-2 border-navy dark:border-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:text-navy dark:hover:text-blue-300"
                }`}
              >
                {item}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <MobileNav
              sections={["Home", "About", "Education", "Experience", "Skills", "Contact"]}
              activeSection={activeSection}
              onSectionClick={(section) => scrollToSection(section)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen pt-32 pb-20 md:pt-0 md:pb-0 relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-blue-dark to-blue"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(21,61,132,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(21,61,132,0.3),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-4 px-4 py-1 bg-skyblue/20 dark:bg-skyblue/30 rounded-full">
              <span className="text-sm font-medium text-white dark:text-skyblue-light">Technology & IP Lawyer</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-white">
              <span className="block">Swagata Datta</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-light to-skyblue">
                Legal Professional
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 mx-auto max-w-lg">
              Technology and IP Lawyer specializing in data privacy, cyber law, and corporate legal compliance.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue hover:bg-blue-dark text-white border-2 border-transparent transition-all duration-300 h-10 px-4 py-2 md:h-11 md:px-8 md:text-base"
              >
                <FileUp className="mr-2 h-5 w-5" /> View Resume
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToContactForm}
                className="border-2 border-white text-black bg-white/90 hover:bg-white hover:text-navy transition-all duration-300"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ChevronDown className="w-10 h-10 text-white animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Logo/Affiliations Section */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <LogoCarousel logos={affiliationLogos} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-navy to-blue mx-auto"></div>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="md:w-1/3"
              >
                <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue to-navy rounded-xl blur-md opacity-70"></div>
                  <div className="relative rounded-xl overflow-hidden border-4 border-white dark:border-slate-800 w-full h-full">
                    <Image
                      src="/images/about.jpg"
                      alt="Swagata Datta"
                      fill
                      className="object-cover scale-125 object-center"
                      priority
                    />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-skyblue/20 backdrop-blur-sm border border-skyblue/30 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-skyblue" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-navy/20 backdrop-blur-sm border border-navy/30 flex items-center justify-center">
                    <Gavel className="w-6 h-6 text-navy" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="md:w-2/3"
              >
                <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6 text-center md:text-left">
                  My Journey in Law
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  Our team at Outleap Technologies Pvt. Ltd. thrived under my counsel, where we guided students to
                  prestigious UK universities. Specializing in Technology Law, my expertise ensured precise guidance,
                  from selecting the right institution to crafting impactful SOPs and CVs. We streamlined visa and
                  accommodation processes, significantly easing students transition to higher education.
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  With a strong foundation in legal education, the outreach initiatives I led forged enduring links
                  between schools, colleges, and universities. Our collaborative efforts culminated in career fairs that
                  opened academic horizons for countless students. My commitment to education is fueled by a passion for
                  leveraging legal knowledge to empower the next generation of tech-savvy legal professionals.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <div className="glass p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue dark:text-blue-300" /> Location
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Kolkata, WB</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue dark:text-blue-300" /> Email
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm md:text-base email-text">
                  Swagatadatta.datta@gmail.com
                </p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue dark:text-blue-300" /> Study
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Nottingham Trent University</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-blue dark:text-blue-300" /> Interests
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Constitutional Law, Human Rights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-skyblue/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-navy/10 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Education</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-navy to-blue mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-navy via-blue to-skyblue"></div>

              {[
                {
                  years: "2022 - 2023",
                  degree: "Masters of Laws - LLM, Technology law ",
                  school: "Nottingham Trent University, UK",
                  description:
                    "Experienced in technology law with expertise in contractual agreements, legal advisory, intellectual property, data privacy compliance, trademark and copyright prosecution, and legal document preparation.",
                  gpa: "3.9/4.0",
                  icon: "GraduationCap",
                  color: "from-blue-light to-blue",
                },
                {
                  years: "2015 - 2018",
                  degree: "Bachelor of Laws - LLB, Law",
                  school: "Fakir Mohan University, Balasore",
                  description:
                    "Law graduate with a background in data privacy law, trademarks, copyright, arbitration, and appeals, actively engaged in music, debates, and theatre acting.",
                  gpa: "3.95/4.0",
                  icon: "BookOpen",
                  color: "from-skyblue-light to-skyblue",
                },
                {
                  years: "2010 - 2012",
                  degree: "High School Diploma",
                  school: "South Point High School, Kolkata",
                  description: "Completed Higher Secondary education in Commerce from South Point High School, Kolkata",
                  gpa: "4.0/4.0",
                  icon: "Award",
                  color: "from-navy-light to-navy",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative mb-16 education-timeline-item"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-1 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-4 border-navy dark:border-blue z-10 flex items-center justify-center shadow-lg">
                    {item.icon === "GraduationCap" && (
                      <GraduationCap className="w-6 h-6 text-navy dark:text-blue-300" />
                    )}
                    {item.icon === "BookOpen" && <BookOpen className="w-6 h-6 text-navy dark:text-blue-300" />}
                    {item.icon === "Award" && <Award className="w-6 h-6 text-navy dark:text-blue-300" />}
                  </div>

                  <div
                    className={`relative mx-auto ${index % 2 === 0 ? "ml-8 md:ml-auto md:mr-auto md:text-right" : "ml-8 md:ml-auto md:mr-auto"} md:w-7/12`}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-navy/20 to-blue/20 rounded-xl blur-sm"></div>
                    <Card className="relative bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>
                      <CardContent className="p-6 pt-8">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-dark dark:text-blue-300 bg-blue/10 dark:bg-blue/20 rounded-full mb-3">
                          {item.years}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">
                          {item.degree}
                        </h3>
                        <h4 className="text-lg text-navy dark:text-blue-300 mb-3">{item.school}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">GPA: {item.gpa}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Legal Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-navy to-blue mx-auto"></div>
          </motion.div>

          <Tabs defaultValue="internships" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-10 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <TabsTrigger
                value="internships"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-navy data-[state=active]:to-navy/80 data-[state=active]:text-white rounded-md py-3"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Work Experience
              </TabsTrigger>
              <TabsTrigger
                value="research"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-navy data-[state=active]:to-navy/80 data-[state=active]:text-white rounded-md py-3"
              >
                <BookText className="w-5 h-5 mr-2" />
                Publications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="internships">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "International Education Counsellor",
                    company: "Leap Scholar",
                    period: "Aug 2024 - Jan 2025",
                    description:
                      "Provided career counseling, university selection guidance, and assistance with applications, SOP & CV editing, visa processes, accommodation booking, and loan assistance.",
                    icon: <Briefcase className="w-6 h-6 text-white" />,
                    color: "from-blue to-blue-dark",
                  },
                  {
                    title: "Academic Counselor & Academic Outreach Coordinator",
                    company: "Blue Sky Educational Services Pvt. Ltd.",
                    period: "August 2023 – July 2024",
                    description:
                      "Counseled students for UK university applications, assisted with visa filings, accommodation, and student loans, and organized career fairs, events, and partnerships between UK universities and local institutions.",
                    icon: <BookOpen className="w-6 h-6 text-white" />,
                    color: "from-skyblue to-skyblue-dark",
                  },
                  {
                    title: "Student Ambassador",
                    company: "Nottingham Trent University",
                    period: "February 2023 – December 2023",
                    description:
                      "Assisted in university events, admissions, and student engagement programs, guided prospective students, represented the university in outreach programs, and conducted presentations on student life and academics.",
                    icon: <FileText className="w-6 h-6 text-white" />,
                    color: "from-blue to-blue-dark",
                  },
                  {
                    title: "Legal Officer",
                    company: "TISO Certifications",
                    period: "April 2020 – May 2023",
                    description:
                      "Managed legal documentation, contract drafting, compliance matters, GDPR adherence, account management, and legal problem-solving.",
                    icon: <Gavel className="w-6 h-6 text-white" />,
                    color: "from-navy to-navy",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800 border-none">
                      <CardContent className="p-0">
                        <div className="flex flex-col h-full">
                          <div className={`bg-gradient-to-r ${item.color} p-4 flex items-center`}>
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 experience-icon">
                              <div className="w-6 h-6 md:w-7 md:h-7">{item.icon}</div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{item.title}</h3>
                              <p className="text-white/80">{item.company}</p>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.period}</p>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="research">
              <div className="grid md:grid-cols-1 gap-8">
                {[
                  {
                    title: "Balancing Constitutional Values: Section 6A Judgment",
                    journal: "Aklank Jain & Associates Newsletter",
                    date: "June 2023",
                    description:
                      "This article provides an in-depth analysis of the Supreme Court's ruling on Section 6A of the Citizenship Act, 1955. It discusses the constitutional challenges, key arguments, and judicial interpretation regarding immigration policies in Assam. The study highlights the impact on Assamese culture, parliamentary competence, and the court's reasoning for upholding Section 6A while addressing concerns about its implementation.",
                    link: "https://www.researchgate.net/publication/387231463_Balancing_Constitutional_Values_Section_6A_of_the_Citizenship_Act_1955_2024_INSC_789",
                    icon: <BookText className="w-6 h-6 text-white" />,
                    color: "from-blue to-blue-dark",
                  },
                  {
                    title: "How a Bank Can Incorporate Blockchain and Crypto Assets in Their Services",
                    journal: "ResearchGate",
                    date: "March 2023",
                    description:
                      "This research paper explores how banks can integrate blockchain technology and cryptocurrency assets into their service offerings. It examines the regulatory challenges, technical implementation considerations, and potential benefits of adopting these emerging technologies in traditional banking systems.",
                    link: "https://www.researchgate.net/publication/387230757_How_a_Bank_Can_Incorporate_Blockchain_and_Crypto_Assets_in_Their_Services?channel=doi&linkId=67650f7e894c5520851f1209&showFulltext=true",
                    icon: <Brain className="w-6 h-6 text-white" />,
                    color: "from-navy to-navy",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800 border-none">
                      <CardContent className="p-0">
                        <div className="flex flex-col h-full">
                          <div className={`bg-gradient-to-r ${item.color} p-4 flex items-center`}>
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 experience-icon">
                              <div className="w-6 h-6 md:w-7 md:h-7">{item.icon}</div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{item.title}</h3>
                              <p className="text-white/80">{item.journal}</p>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.date}</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                            <a
                              href={item.link}
                              className="inline-flex items-center text-blue dark:text-blue-300 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Read Publication <ExternalLink className="ml-1 w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-navy to-blue mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <Gavel className="w-7 h-7 mr-3 text-blue dark:text-blue-300" />
                Legal Skills
              </h3>

              {[
                {
                  name: "Intellectual Property Law",
                  percentage: 95,
                  icon: <BookText className="w-5 h-5 text-blue dark:text-blue-300" />,
                },
                {
                  name: "Data Privacy & Cyber Law",
                  percentage: 90,
                  icon: <ScrollText className="w-5 h-5 text-skyblue dark:text-blue-300" />,
                },
                {
                  name: "Contract Law & Negotiation",
                  percentage: 95,
                  icon: <Users className="w-5 h-5 text-blue-light dark:text-blue-300" />,
                },
                {
                  name: "Legal Research & Writing",
                  percentage: 98,
                  icon: <FileText className="w-5 h-5 text-blue dark:text-blue-300" />,
                },
                {
                  name: "Litigation & Dispute Resolution",
                  percentage: 91,
                  icon: <Users className="w-5 h-5 text-navy dark:text-blue-300" />,
                },
              ].map((skill, index) => (
                <div key={index} className="mb-8">
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-gray-900 dark:text-white flex items-center text-lg">
                      <span className="mr-3 p-2 rounded-full bg-white/50 dark:bg-slate-800/50">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-blue dark:text-blue-300 font-semibold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-navy via-blue to-skyblue rounded-full relative overflow-hidden"
                    >
                      <span
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent animate-shimmer"
                        style={{ transform: "translateX(-100%)" }}
                      ></span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass p-8 rounded-xl mb-10"
              >
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <BookMarked className="w-7 h-7 mr-3 text-blue dark:text-blue-300" />
                  Areas of Expertise
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "Legal Advisory & Consulting",
                      icon: <Scale className="w-5 h-5" />,
                      color: "bg-blue/10 text-blue dark:text-blue-300 border-blue/20 dark:border-blue-300/20",
                    },
                    {
                      name: "Contract Law & Negotiation",
                      icon: <Users className="w-5 h-5" />,
                      color: "bg-skyblue/10 text-skyblue dark:text-blue-300 border-skyblue/20 dark:border-blue-300/20",
                    },
                    {
                      name: "Data Privacy & Cyber Law",
                      icon: <FileText className="w-5 h-5" />,
                      color: "bg-blue/10 text-blue-dark dark:text-blue-300 border-blue/20 dark:border-blue-300/20",
                    },
                    {
                      name: "Legal Research & Writing ",
                      icon: <BookText className="w-5 h-5" />,
                      color: "bg-navy/10 text-navy dark:text-blue-300 border-navy/20 dark:border-blue-300/20",
                    },
                    {
                      name: "Copyright & Trademark Prosecution",
                      icon: <Briefcase className="w-5 h-5" />,
                      color: "bg-blue/10 text-blue dark:text-blue-300 border-blue/20 dark:border-blue-300/20",
                    },
                    {
                      name: "International Law & Regulations",
                      icon: <Globe className="w-5 h-5" />,
                      color: "bg-skyblue/10 text-skyblue dark:text-blue-300 border-skyblue/20 dark:border-blue-300/20",
                    },
                    {
                      name: "Patent Law & Patent Litigation",
                      icon: <Gavel className="w-5 h-5" />,
                      color: "bg-blue/10 text-blue-dark dark:text-blue-300 border-blue/20 dark:border-blue-300/20",
                    },
                    {
                      name: "Intellectual Property Law",
                      icon: <ScrollText className="w-5 h-5" />,
                      color: "bg-navy/10 text-navy dark:text-blue-300 border-navy/20 dark:border-blue-300/20",
                    },
                  ].map((area, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`${area.color} border rounded-lg p-3 flex items-center hover:scale-105 transition-transform duration-300`}
                    >
                      <span className="mr-2">{area.icon}</span>
                      <span className="font-medium">{area.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass p-8 rounded-xl"
              >
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Globe className="w-7 h-7 mr-3 text-blue dark:text-blue-300" />
                  Languages
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { language: "English", level: "Native", percentage: 100, color: "from-blue to-blue-dark" },
                    { language: "Bengali", level: "Native", percentage: 100, color: "from-skyblue to-skyblue-dark" },
                    { language: "Hindi", level: "Native", percentage: 100, color: "from-blue to-blue-dark" },
                    { language: "French", level: "Basic", percentage: 40, color: "from-navy to-navy" },
                  ].map((lang, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{lang.language}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm bg-white/50 dark:bg-slate-800/50 px-2 py-0.5 rounded-full">
                          {lang.level}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          viewport={{ once: true }}
                          className={`h-full bg-gradient-to-r ${lang.color} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Contact Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-navy to-blue mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Mail className="w-7 h-7 mr-3 text-blue dark:text-blue-300" />
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                I'm always open to discussing new opportunities, legal research collaborations, or just connecting with
                fellow legal professionals. Feel free to reach out!
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-full bg-blue/20 dark:bg-blue/30 flex items-center justify-center mr-4">
                    <Mail className="w-7 h-7 text-blue-dark dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">Swagatadatta.datta@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-full bg-skyblue/20 flex items-center justify-center mr-4">
                    <Phone className="w-7 h-7 text-skyblue dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300">+91 9051296055</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-full bg-blue/20 flex items-center justify-center mr-4">
                    <MapPin className="w-7 h-7 text-blue dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">Kolkata, WB</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-full bg-navy/20 flex items-center justify-center mr-4">
                    <Linkedin className="w-7 h-7 text-navy dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">LinkedIn</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a
                        href="https://www.linkedin.com/in/swagata-datta/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        linkedin.com/in/swagata-datta
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ScrollText className="w-7 h-7 mr-3 text-blue dark:text-blue-300" />
                Send a Message
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-blue focus:border-blue dark:focus:ring-blue-300 dark:focus:border-blue-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-blue focus:border-blue dark:focus:ring-blue-300 dark:focus:border-blue-300"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-blue focus:border-blue dark:focus:ring-blue-300 dark:focus:border-blue-300"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-blue focus:border-blue dark:focus:ring-blue-300 dark:focus:border-blue-300"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-gradient-to-r from-navy to-blue hover:from-navy/90 hover:to-blue/90 text-white font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-navy to-navy/80 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <Logo size="lg" variant="white" />
              <p className="text-white/80 mt-3 font-light">Technology Law & Legal Officer</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Swagata Datta</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Nottingham Law School</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Kolkata</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <Link
                  href="https://www.linkedin.com/in/swagata-datta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue transition-colors duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue transition-colors duration-300"
                >
                  <Github className="w-6 h-6" />
                </Link>
                <Link
                  href="mailto:ambikadas0412@gmail.com"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue transition-colors duration-300"
                >
                  <Mail className="w-6 h-6" />
                </Link>
              </div>
              <p className="text-white/70 text-center md:text-right">
                &copy; {new Date().getFullYear()} Swagata Datta. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  )
}

