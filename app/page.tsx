"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Trash2,
  Calculator,
  GraduationCap,
  BookOpen,
  Award,
  Star,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  grade: string
  credits: number
}

interface Semester {
  id: string
  name: string
  gpa: number
  credits: number
}

const gradePoints: { [key: string]: number } = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  RA: 0,
}

const gradeColors: { [key: string]: string } = {
  O: "from-emerald-500 to-green-500",
  "A+": "from-blue-500 to-cyan-500",
  A: "from-indigo-500 to-blue-500",
  "B+": "from-purple-500 to-indigo-500",
  B: "from-pink-500 to-purple-500",
  C: "from-orange-500 to-pink-500",
  RA: "from-red-500 to-orange-500",
}

export default function Component() {
  const [courses, setCourses] = useState<Course[]>([{ id: "1", grade: "", credits: 1.5 }])
  const [semesters, setSemesters] = useState<Semester[]>([{ id: "1", name: "Semester 1", gpa: 0, credits: 0 }])
  const [gpa, setGpa] = useState<number>(0)
  const [cgpa, setCgpa] = useState<number>(0)
  const [activeTab, setActiveTab] = useState("gpa")

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      grade: "",
      credits: 1.5,
    }
    setCourses([...courses, newCourse])
  }

  const removeCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      gpa: 0,
      credits: 0,
    }
    setSemesters([...semesters, newSemester])
  }

  const removeSemester = (id: string) => {
    setSemesters(semesters.filter((semester) => semester.id !== id))
  }

  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters(semesters.map((semester) => (semester.id === id ? { ...semester, [field]: value } : semester)))
  }

  const calculateGPA = (coursesToCalculate: Course[]) => {
    let totalPoints = 0
    let totalCredits = 0

    coursesToCalculate.forEach((course) => {
      if (course.grade && gradePoints[course.grade] !== undefined) {
        const gradePoint = gradePoints[course.grade]
        const creditPoints = gradePoint * course.credits
        totalPoints += creditPoints
        totalCredits += course.credits
      }
    })

    return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0
  }

  const calculateCGPA = (semestersToCalculate: Semester[]) => {
    let totalWeightedGPA = 0
    let totalCredits = 0

    semestersToCalculate.forEach((semester) => {
      if (semester.gpa > 0 && semester.credits > 0) {
        totalWeightedGPA += semester.gpa * semester.credits
        totalCredits += semester.credits
      }
    })

    return totalCredits > 0 ? Math.round((totalWeightedGPA / totalCredits) * 100) / 100 : 0
  }

  const getTotalCreditPoints = () => {
    let totalPoints = 0
    courses.forEach((course) => {
      if (course.grade && gradePoints[course.grade] !== undefined) {
        totalPoints += gradePoints[course.grade] * course.credits
      }
    })
    return totalPoints
  }

  const getTotalCredits = () => {
    return courses.reduce((total, course) => {
      if (course.grade && gradePoints[course.grade] !== undefined) {
        return total + course.credits
      }
      return total
    }, 0)
  }

  const getGPAStatus = (gpa: number) => {
    if (gpa >= 9) return { text: "Outstanding", color: "text-emerald-400", icon: Trophy }
    if (gpa >= 8) return { text: "Excellent", color: "text-blue-400", icon: Award }
    if (gpa >= 7) return { text: "Very Good", color: "text-indigo-400", icon: Star }
    if (gpa >= 6) return { text: "Good", color: "text-purple-400", icon: TrendingUp }
    if (gpa >= 5) return { text: "Average", color: "text-orange-400", icon: Target }
    return { text: "Needs Improvement", color: "text-red-400", icon: Zap }
  }

  useEffect(() => {
    const calculatedGPA = calculateGPA(courses)
    setGpa(calculatedGPA)
  }, [courses])

  useEffect(() => {
    const calculatedCGPA = calculateCGPA(semesters)
    setCgpa(calculatedCGPA)
  }, [semesters])

  const gpaStatus = getGPAStatus(gpa)
  const cgpaStatus = getGPAStatus(cgpa)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-2">
                Academic Excellence
              </h1>
              <p className="text-slate-600 text-lg font-medium">Precision GPA & CGPA Calculator</p>
              <div className="flex items-center justify-center space-x-2 mt-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                <span className="text-slate-500 text-sm font-medium">Anna University Compatible</span>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200/50 rounded-2xl p-2 h-16">
            <TabsTrigger
              value="gpa"
              className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-500 rounded-xl py-4 font-semibold text-base"
            >
              <Calculator className="w-5 h-5" />
              <span>GPA Calculator</span>
            </TabsTrigger>
            <TabsTrigger
              value="cgpa"
              className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-500 rounded-xl py-4 font-semibold text-base"
            >
              <BarChart3 className="w-5 h-5" />
              <span>CGPA Calculator</span>
            </TabsTrigger>
          </TabsList>

          {/* GPA Calculator */}
          <TabsContent value="gpa" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
                    <CardTitle className="flex items-center space-x-4 text-2xl font-bold">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <span>Course Management</span>
                    </CardTitle>
                    <CardDescription className="text-blue-100 text-lg mt-2">
                      Add your courses and grades to calculate your semester GPA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    {courses.map((course, index) => (
                      <div
                        key={course.id}
                        className="group p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-300 animate-slideIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                          <div className="space-y-3">
                            <Label
                              htmlFor={`course-grade-${course.id}`}
                              className="text-slate-700 font-semibold text-sm"
                            >
                              Grade
                            </Label>
                            <Select
                              value={course.grade}
                              onValueChange={(value) => updateCourse(course.id, "grade", value)}
                            >
                              <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12 text-slate-700 font-medium">
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-200 rounded-xl">
                                {Object.keys(gradePoints).map((grade) => (
                                  <SelectItem key={grade} value={grade} className="font-medium py-3">
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradeColors[grade]}`}
                                      ></div>
                                      <span>{grade}</span>
                                      <span className="text-slate-500">({gradePoints[grade]} pts)</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-3">
                            <Label
                              htmlFor={`course-credits-${course.id}`}
                              className="text-slate-700 font-semibold text-sm"
                            >
                              Credits
                            </Label>
                            <Input
                              id={`course-credits-${course.id}`}
                              type="number"
                              min="0.5"
                              max="6"
                              step="0.5"
                              value={course.credits}
                              onChange={(e) =>
                                updateCourse(course.id, "credits", Number.parseFloat(e.target.value) || 0)
                              }
                              className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12 text-slate-700 font-medium"
                              placeholder="1.5"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeCourse(course.id)}
                            disabled={courses.length === 1}
                            className="h-12 w-12 rounded-xl border-slate-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors group-hover:opacity-100 opacity-60"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {course.grade && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">Credit Points:</span>
                              <span className="font-bold text-slate-800">
                                {(gradePoints[course.grade] * course.credits).toFixed(1)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={addCourse}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-4 rounded-2xl font-semibold text-lg h-14"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add New Course
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* GPA Display */}
                <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 rounded-3xl overflow-hidden">
                  <CardHeader className="text-center p-8">
                    <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-bold">
                      <gpaStatus.icon className="w-8 h-8 animate-pulse" />
                      <span>Your GPA</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-8 pt-0">
                    <div className="text-8xl font-bold mb-4 animate-pulse-slow">{gpa.toFixed(2)}</div>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg font-semibold"
                      >
                        Out of 10.00
                      </Badge>
                    </div>
                    <div className={`flex items-center justify-center space-x-2 ${gpaStatus.color}`}>
                      <gpaStatus.icon className="w-5 h-5" />
                      <span className="font-semibold text-lg">{gpaStatus.text}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Calculation Breakdown */}
                <Card className="bg-white/80 backdrop-blur-xl shadow-xl border border-slate-200/50 rounded-3xl overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="text-slate-800 text-xl font-bold flex items-center space-x-2">
                      <Calculator className="w-5 h-5" />
                      <span>Calculation Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <span className="text-slate-700 font-medium">Total Credit Points:</span>
                      <Badge className="bg-blue-500 text-white px-3 py-1 font-bold">
                        {getTotalCreditPoints().toFixed(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <span className="text-slate-700 font-medium">Total Credits:</span>
                      <Badge className="bg-purple-500 text-white px-3 py-1 font-bold">
                        {getTotalCredits().toFixed(1)}
                      </Badge>
                    </div>
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
                      <div className="text-slate-600 text-sm font-mono text-center mb-2">
                        GPA = Total Credit Points ÷ Total Credits
                      </div>
                      <div className="text-slate-800 font-mono text-center font-bold">
                        {getTotalCreditPoints().toFixed(1)} ÷ {getTotalCredits().toFixed(1)} = {gpa.toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Grade Scale */}
                <Card className="bg-white/80 backdrop-blur-xl shadow-xl border border-slate-200/50 rounded-3xl overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="text-slate-800 text-xl font-bold flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Grade Scale</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                      {Object.entries(gradePoints).map(([grade, points]) => (
                        <div
                          key={grade}
                          className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${gradeColors[grade]}`}></div>
                            <span className="text-slate-800 font-bold text-lg">{grade}</span>
                          </div>
                          <span className="text-slate-600 font-bold">{points}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* CGPA Calculator */}
          <TabsContent value="cgpa" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {semesters.map((semester, semesterIndex) => (
                  <Card
                    key={semester.id}
                    className="bg-white/80 backdrop-blur-xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden animate-slideIn"
                    style={{ animationDelay: `${semesterIndex * 200}ms` }}
                  >
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-3 text-xl font-bold">
                          <div className="p-2 bg-white/20 rounded-xl">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <span>{semester.name}</span>
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSemester(semester.id)}
                          disabled={semesters.length === 1}
                          className="bg-white/20 border-white/30 text-white hover:bg-red-500/20 hover:border-red-400 rounded-xl h-10 w-10 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor={`semester-gpa-${semester.id}`} className="text-slate-700 font-semibold">
                            Semester GPA
                          </Label>
                          <Input
                            id={`semester-gpa-${semester.id}`}
                            type="number"
                            min="0"
                            max="10"
                            step="0.01"
                            placeholder="e.g., 8.5"
                            value={semester.gpa || ""}
                            onChange={(e) => updateSemester(semester.id, "gpa", Number.parseFloat(e.target.value) || 0)}
                            className="bg-white border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl h-12 text-slate-700 font-medium text-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor={`semester-credits-${semester.id}`} className="text-slate-700 font-semibold">
                            Total Credits
                          </Label>
                          <Input
                            id={`semester-credits-${semester.id}`}
                            type="number"
                            min="1"
                            max="30"
                            placeholder="e.g., 20"
                            value={semester.credits || ""}
                            onChange={(e) =>
                              updateSemester(semester.id, "credits", Number.parseInt(e.target.value) || 0)
                            }
                            className="bg-white border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl h-12 text-slate-700 font-medium text-lg"
                          />
                        </div>
                      </div>
                      {semester.gpa > 0 && semester.credits > 0 && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                          <div className="flex items-center justify-between">
                            <span className="text-emerald-700 font-medium">Weighted Points:</span>
                            <span className="font-bold text-emerald-800 text-lg">
                              {(semester.gpa * semester.credits).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={addSemester}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-4 rounded-2xl font-semibold text-lg h-16"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Semester
                </Button>
              </div>

              <div className="space-y-6">
                {/* CGPA Display */}
                <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 rounded-3xl overflow-hidden">
                  <CardHeader className="text-center p-8">
                    <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-bold">
                      <cgpaStatus.icon className="w-8 h-8 animate-pulse" />
                      <span>Your CGPA</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-8 pt-0">
                    <div className="text-8xl font-bold mb-4 animate-pulse-slow">{cgpa.toFixed(2)}</div>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg font-semibold"
                      >
                        Cumulative GPA
                      </Badge>
                    </div>
                    <div className={`flex items-center justify-center space-x-2 ${cgpaStatus.color}`}>
                      <cgpaStatus.icon className="w-5 h-5" />
                      <span className="font-semibold text-lg">{cgpaStatus.text}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Semester Breakdown */}
                <Card className="bg-white/80 backdrop-blur-xl shadow-xl border border-slate-200/50 rounded-3xl overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="text-slate-800 text-xl font-bold flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Semester Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    {semesters.map((semester) => (
                      <div
                        key={semester.id}
                        className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                          <span className="text-slate-800 font-medium">{semester.name}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none px-3 py-1 font-bold"
                        >
                          {semester.gpa.toFixed(2)}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* CGPA Formula */}
                <Card className="bg-white/80 backdrop-blur-xl shadow-xl border border-slate-200/50 rounded-3xl overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="text-slate-800 text-xl font-bold flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Calculation Method</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 mb-4">
                      <div className="text-slate-600 text-sm font-mono text-center mb-2">
                        CGPA = Σ(Semester GPA × Credits) / Σ(All Credits)
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Your CGPA is calculated by taking the weighted average of all semester GPAs based on their
                      respective credit loads.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-slate-200/50 mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-slate-700 font-medium mb-2">© 2024 Academic Excellence Calculator</p>
          <p className="text-slate-500 text-sm">
            Designed for precision • Built for students • Anna University Compatible
          </p>
        </div>
      </footer>
    </div>
  )
}
