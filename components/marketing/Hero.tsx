'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'

export default function Hero() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile)
      // TODO: Navigate to analysis page with file
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile)
      // TODO: Navigate to analysis page with file
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 mb-8">
          <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
            Le premier Career OS français
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-white mb-6">
          Prenez soin de votre{' '}
          <span className="text-teal-600 dark:text-teal-400">carrière</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
          Analysez votre CV en 30 secondes. Obtenez un diagnostic complet et des recommandations personnalisées pour booster votre carrière.
        </p>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative max-w-xl mx-auto mb-10 p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
            ${isDragging 
              ? 'border-teal-500 bg-teal-50 dark:bg-teal-950 scale-[1.02]' 
              : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800/50 hover:border-teal-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
            }
          `}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            {/* Upload Icon */}
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
              ${isDragging 
                ? 'bg-teal-100 dark:bg-teal-900' 
                : 'bg-neutral-100 dark:bg-neutral-700'
              }
            `}>
              <svg 
                className={`w-8 h-8 transition-colors ${isDragging ? 'text-teal-600' : 'text-neutral-500 dark:text-neutral-400'}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>

            {/* Text */}
            <div>
              <p className="text-lg font-medium text-neutral-900 dark:text-white mb-1">
                {file ? file.name : 'Déposez votre CV ici'}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                PDF uniquement · 5 MB max · Gratuit
              </p>
            </div>

            {/* Or separator with button */}
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"/>
              <span className="text-sm text-neutral-400">ou</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"/>
            </div>

            <button className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors inline-flex items-center gap-2">
              Parcourir mes fichiers
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <span>100% gratuit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <span>Sans inscription</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <span>RGPD compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}
