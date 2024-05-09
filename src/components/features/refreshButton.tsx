'use client'

import React from 'react';
import { Button } from "@/components/ui/button"

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Button onClick={handleReload} className="mx-1">Reload Page</Button>
  );
};

export default ReloadButton;