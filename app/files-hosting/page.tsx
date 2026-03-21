import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Upload, File, Download, Search } from "lucide-react";

const FilesPage = () => {
  const files = [
    {
      id: 1,
      name: "Research Paper.pdf",
      size: "2.4 MB",
      modified: "Feb 3, 2026",
      type: "PDF",
    },
    {
      id: 2,
      name: "Project Proposal.docx",
      size: "1.8 MB",
      modified: "Feb 2, 2026",
      type: "Document",
    },
    {
      id: 3,
      name: "Presentation Slides.pptx",
      size: "5.2 MB",
      modified: "Feb 1, 2026",
      type: "Presentation",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#FFD700] mb-2">File Hosting</h1>
            <p className="text-gray-400">Manage and share your files securely</p>
          </div>
          <Button className="bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search files by name or type..." 
            className="pl-10 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Storage</CardTitle>
            <FolderOpen className="h-4 w-4 text-[#FFD700]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">50 GB</div>
            <p className="text-xs text-gray-500 mt-1">Available space</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Files Uploaded</CardTitle>
            <File className="h-4 w-4 text-[#FFD700]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">234</div>
            <p className="text-xs text-gray-500 mt-1">Total files</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Shared Files</CardTitle>
            <Download className="h-4 w-4 text-[#FFD700]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45</div>
            <p className="text-xs text-gray-500 mt-1">Public files</p>
          </CardContent>
        </Card>
      </div>

      {/* File List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Files</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card key={file.id} className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white group-hover:text-[#FFD700] transition-colors text-base">
                      {file.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm mt-1">
                      {file.type} • {file.size}
                    </CardDescription>
                  </div>
                  <div className="bg-[#FFD700] p-2 rounded-lg">
                    <File className="h-5 w-5 text-[#1E1E1E]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-400 mb-4">
                  Modified: {file.modified}
                </div>
                <Button className="w-full bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
