'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'

export default function Hero() {
  const [isDragging, setIsDragging] = useState(false)

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
    const files = e.dataTransfer.files
    if (files.length > 0) {
      // Handle file upload
      console.log('File dropped:', files[0])
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8">
          <svg className="w-4 h-4 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
            Le premier Career OS français
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6 text-neutral-900 dark:text-white">
          Prenez soin de votre{' '}
          <span className="text-teal-500">carrière</span>
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
            relative max-w-xl mx-auto mb-10 p-8 rounded-2xl border-2 border-dashed
            transition-all duration-200 cursor-pointer
            ${isDragging 
              ? 'border-teal-500 bg-teal-500/10 scale-[1.02]' 
              : 'border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 hover:border-teal-500/50 hover:bg-teal-500/5'
            }
            backdrop-blur-sm
          `}
        >
          <input
            type="file"
            accept=".pdf"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) console.log('File selected:', file)
            }}
          />
          
          <div className="flex flex-col items-center gap-3">
            {/* Upload Icon */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${isDragging ? 'bg-teal-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}
              transition-all duration-200
            `}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">
                Déposez votre CV ici
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                PDF uniquement · 5 MB max · Gratuit
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/cv/new"
            className="px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            Analyser mon CV
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200 font-medium"
          >
            En savoir plus
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-neutral-500 dark:text-neutral-400">
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
