import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Search, Award, Calendar } from "lucide-react";

const ScholarshipPage = () => {
  const scholarships = [
    {
      id: 1,
      title: "DOST - SBI SET",
      institution: "Department of Science and Technology",
      amount: "Full Scholarship",
      deadline: "March 15, 2026",
    },
    {
      id: 2,
      title: "SM College Scholarship",
      institution: "SM Foundation",
      amount: "₱50,000 per semester",
      deadline: "April 1, 2026",
    },
    {
      id: 3,
      title: "Undergraduate Merit Award",
      institution: "University Scholarship Program",
      amount: "₱75,000 annual",
      deadline: "May 30, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#FFD700] mb-2">Scholarship Opportunities</h1>
            <p className="text-gray-400">Find and apply for educational funding</p>
          </div>
          <Button className="bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold">
            <Award className="mr-2 h-4 w-4" />
            My Applications
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search scholarships by name, institution, or field..." 
            className="pl-10 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white group-hover:text-[#FFD700] transition-colors">
                    {scholarship.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm mt-1">
                    {scholarship.institution}
                  </CardDescription>
                </div>
                <div className="bg-[#FFD700] p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-[#1E1E1E]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Award Amount</span>
                  <span className="text-sm text-[#FFD700] font-semibold">{scholarship.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {scholarship.deadline}</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipPage;
