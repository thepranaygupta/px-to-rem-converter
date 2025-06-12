"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Settings, ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { motion } from "framer-motion";

export default function PxRemConverter() {
  const [pxValue, setPxValue] = useState("");
  const [remValue, setRemValue] = useState("");
  const [baseSize, setBaseSize] = useState(16);
  const [copiedPx, setCopiedPx] = useState(false);
  const [copiedRem, setCopiedRem] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Convert px to rem
  const pxToRem = (px: number, base: number) => {
    return px / base;
  };

  // Convert rem to px
  const remToPx = (rem: number, base: number) => {
    return rem * base;
  };

  // Handle px input change
  const handlePxChange = (value: string) => {
    setPxValue(value);
    if (value && !isNaN(Number(value))) {
      const rem = pxToRem(Number(value), baseSize);
      setRemValue(rem.toString());
    } else {
      setRemValue("");
    }
  };

  // Handle rem input change
  const handleRemChange = (value: string) => {
    setRemValue(value);
    if (value && !isNaN(Number(value))) {
      const px = remToPx(Number(value), baseSize);
      setPxValue(px.toString());
    } else {
      setPxValue("");
    }
  };

  // Handle base size change
  const handleBaseSizeChange = (value: string) => {
    const newBase = Number(value);
    if (newBase > 0) {
      setBaseSize(newBase);
      // Recalculate values if px is set
      if (pxValue && !isNaN(Number(pxValue))) {
        const rem = pxToRem(Number(pxValue), newBase);
        setRemValue(rem.toString());
      }
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, type: "px" | "rem") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "px") {
        setCopiedPx(true);
        setTimeout(() => setCopiedPx(false), 2000);
      } else {
        setCopiedRem(true);
        setTimeout(() => setCopiedRem(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Generate conversion table data
  const generateTableData = () => {
    const commonPxValues = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96];
    return commonPxValues.map((px) => ({
      px,
      rem: pxToRem(px, baseSize),
    }));
  };

  return (
    <div className="min-h-screen text-gray-100 bg-gradient-to-br from-[#181a1b] to-[#1f2123]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
            PX to REM Converter
          </h1>
          <p className="text-gray-300 text-lg">Instant bi-directional conversion between pixels and rem units</p>
        </motion.div>

        {/* Main Converter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="mb-10 bg-[#1c1e1f] border-[#2a2d2e] shadow-lg shadow-blue-900/10 overflow-hidden">
            <CardHeader className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-100 text-2xl">Unit Converter</CardTitle>
                  <CardDescription className="text-gray-300">
                    Convert between pixels and rem units instantly
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="border-gray-600 text-gray-800 hover:text-gray-700 hover:bg-gray-200 transition-all">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Settings */}
              <Collapsible open={showSettings} onOpenChange={setShowSettings}>
                <CollapsibleContent className="space-y-4 pb-4 border-b border-gray-700">
                  <div className="space-y-2">
                    <Label htmlFor="baseSize" className="text-gray-200">
                      Base Font Size (Root Size)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="baseSize"
                        type="number"
                        value={baseSize}
                        onChange={(e) => handleBaseSizeChange(e.target.value)}
                        className="w-24 bg-gray-800 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                        min="1"
                      />
                      <span className="text-gray-300">px</span>
                    </div>
                    <p className="text-sm text-gray-400">Default browser font size is typically 16px</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Converter Inputs */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* PX Input */}
                <div className="space-y-2">
                  <Label htmlFor="px" className="text-gray-200 flex items-center">
                    <span className="text-blue-400 font-medium mr-1">PX</span> Pixels
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="px"
                      type="number"
                      placeholder="Enter px value"
                      value={pxValue}
                      onChange={(e) => handlePxChange(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`${pxValue}px`, "px")}
                      disabled={!pxValue}
                      className="border-gray-600 text-gray-800 hover:text-gray-700 hover:bg-gray-200 transition-all">
                      {copiedPx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* REM Input */}
                <div className="space-y-2">
                  <Label htmlFor="rem" className="text-gray-200 flex items-center">
                    <span className="text-blue-400 font-medium mr-1">REM</span> Root EM
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="rem"
                      type="number"
                      placeholder="Enter rem value"
                      value={remValue}
                      onChange={(e) => handleRemChange(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      step="0.01"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(`${remValue}rem`, "rem")}
                      disabled={!remValue}
                      className="border-gray-600 text-gray-800 hover:text-gray-700 hover:bg-gray-200 transition-all">
                      {copiedRem ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Current Base Size Display */}
              <div className="text-center p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600">
                <p className="text-gray-300">
                  Current base size: <span className="font-semibold text-blue-400">{baseSize}px</span>
                </p>
                <p className="text-sm text-gray-400 mt-1">1rem = {baseSize}px</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="mb-10 bg-[#1c1e1f] border-[#2a2d2e] shadow-lg shadow-blue-900/10 overflow-hidden">
            <CardHeader className="pt-6">
              <CardTitle className="text-gray-100 text-2xl">Conversion Table</CardTitle>
              <CardDescription className="text-gray-300">
                Common pixel to rem conversions (base: {baseSize}px)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {generateTableData().map(({ px, rem }) => (
                  <div
                    key={px}
                    className="relative p-3 bg-gray-800 rounded-lg text-center hover:bg-gray-700 transition-all cursor-pointer group overflow-hidden"
                    onClick={() => {
                      setPxValue(px.toString());
                      setRemValue(rem.toString());
                    }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="font-semibold text-gray-100">{px}px</div>
                    <div className="text-sm text-blue-400">
                      {" "}
                      {parseFloat(rem.toFixed(3)).toString().replace(/\.0+$/, "")}rem
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="mb-10 bg-[#1c1e1f] border-[#2a2d2e] shadow-lg shadow-purple-900/10 overflow-hidden">
            <CardHeader className="pt-6">
              <CardTitle className="text-gray-100 text-2xl">Understanding REM vs PX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">What is REM?</h3>
                  <p>
                    REM (Root EM) is a relative unit that is based on the font-size of the root element (html). 1rem
                    equals the font size of the root element, which is typically 16px in most browsers by default.
                  </p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">What is PX?</h3>
                  <p>
                    PX (Pixels) is an absolute unit that represents a single dot on a screen. It provides precise
                    control but doesn't scale with user preferences or different devices.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">When to Use Each?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-200">Use REM for:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Typography</li>
                      <li>Spacing and margins</li>
                      <li>Layout that should scale</li>
                      <li>Responsive designs</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-200">Use PX for:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Borders</li>
                      <li>Shadows</li>
                      <li>Pixel-perfect elements</li>
                      <li>Fixed-size components</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-pink-400 mb-2">Benefits of REM</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center p-2 bg-gray-700 rounded">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                    Respects user's font size preferences
                  </li>
                  <li className="flex items-center p-2 bg-gray-700 rounded">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                    Better accessibility
                  </li>
                  <li className="flex items-center p-2 bg-gray-700 rounded">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                    Consistent scaling across devices
                  </li>
                  <li className="flex items-center p-2 bg-gray-700 rounded">
                    <div className="w-2 h-2 rounded-full bg-pink-400 mr-2"></div>
                    Easier maintenance of proportional designs
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center py-8 border-t border-gray-700 mt-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-lg bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full"></div>
            <a
              href="https://pranaygupta.in"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center px-4 py-2 border border-gray-600 hover:border-blue-500 transition-all group">
              <span className="text-gray-300  transition-colors">Built by Pranay Gupta</span>
              <ExternalLink className="w-4 h-4 ml-2 text-gray-400  transition-colors" />
            </a>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            A simple tool to convert between px and rem units for modern web development
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
