import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { features } from "@/data/landing_page/data";
import brew_scholar from "../public/brew_scholar_dark.png";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 from-[#2A2A2A] to-transparent h-96" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 relative w-40 h-40">
              <Image
                src={brew_scholar}
                alt="BrewScholar Logo"
                fill
                className="object-contain filter invert brightness-0"
                sizes="160"
              />
            </div>

            {/* <h1 className="text-5xl font-bold mb-4">
              <span className="text-white">Brew</span>
              <span className="text-[#FFD700]">Scholar</span>
            </h1> */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Pour over opportunities and brew up your brightest future with
              BrewScholar
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Explore Features
          </h2>
          <p className="text-gray-400">Choose a service to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link href={feature.href} key={feature.id}>
                <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all cursor-pointer group h-full hover:scale-105 duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-[#FFD700] p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-[#1E1E1E]" />
                      </div>
                    </div>
                    <CardTitle className="text-white text-center group-hover:text-[#FFD700] transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-center text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold group-hover:gap-2 transition-all">
                      Get Started
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#2A2A2A] border-[#3A3A3A] text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-[#FFD700] mb-2">
                1,234+
              </div>
              <p className="text-gray-400">Active Users</p>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-[#3A3A3A] text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-[#FFD700] mb-2">567+</div>
              <p className="text-gray-400">Opportunities</p>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-[#3A3A3A] text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-[#FFD700] mb-2">89%</div>
              <p className="text-gray-400">Success Rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
