'use client'

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

const MedicalSpecialistChatLink: React.FC = () => {
  return (
    <Card className="w-full max-w-md mx-auto my-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Talk to Our Medical Specialist</CardTitle>
        <CardDescription>Get expert medical advice from our AI-powered chatbot</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={() => window.open('https://nov2-medbot.vercel.app/', '_blank')}>
          Chat with Medical Specialist
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default MedicalSpecialistChatLink;

