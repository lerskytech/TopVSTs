"use client"

import * as React from 'react'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Star, ThumbsUp, MessageSquare } from 'lucide-react'
import { cn } from '../../lib/utils'

// Mock data for example comments
const mockComments = [
  {
    id: '1',
    author: 'Mike Johnson',
    date: '2023-08-15T14:30:00',
    rating: 5,
    content: 'This synth is absolutely incredible! I\'ve been using it for about 6 months now and it has completely changed my production workflow. The wavetable capabilities are mind-blowing and the modulation options are endless. Definitely worth every penny.',
    likes: 24,
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    author: 'Sarah Williams',
    date: '2023-07-22T09:15:00',
    rating: 4,
    content: 'I love Serum\'s sound quality and interface. It\'s intuitive yet powerful. The only reason I\'m giving 4 stars instead of 5 is that it can be pretty CPU intensive when you start stacking instances in your project.',
    likes: 17,
    avatar: 'https://i.pravatar.cc/150?img=20'
  },
  {
    id: '3',
    author: 'David Chen',
    date: '2023-06-10T16:45:00',
    rating: 5,
    content: 'As someone who\'s been producing for over 10 years, I can confidently say Serum is one of the best synths I\'ve ever used. The visual feedback is so helpful for understanding what\'s happening with your sound. Highly recommended for both beginners and professionals!',
    likes: 32,
    avatar: 'https://i.pravatar.cc/150?img=33'
  }
]

interface CommentFormProps {
  reviewSlug: string
}

function CommentForm({ reviewSlug }: CommentFormProps) {
  const [rating, setRating] = useState<number>(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form
      setRating(0)
      setName('')
      setEmail('')
      setContent('')
      
      // Reset success message after a delay
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1000)
  }
  
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
      
      {submitSuccess ? (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 rounded-md p-4 mb-4">
          Thank you for your review! It will appear once approved.
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Your Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "h-6 w-6 transition-all",
                    star <= rating ? "text-neon-yellow fill-neon-yellow" : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
            </span>
          </div>
        </div>
        
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your email will not be published
            </p>
          </div>
        </div>
        
        {/* Review Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-2">Your Review</label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <Button type="submit" disabled={isSubmitting || rating === 0}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  )
}

interface CommentItemProps {
  comment: {
    id: string
    author: string
    date: string
    rating: number
    content: string
    likes: number
    avatar: string
  }
  index: number
}

function CommentItem({ comment, index }: CommentItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)
  
  const handleLike = () => {
    if (!liked) {
      setLikeCount(prev => prev + 1)
      setLiked(true)
    } else {
      setLikeCount(prev => prev - 1)
      setLiked(false)
    }
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-t border-border py-6 first:border-t-0"
    >
      <div className="flex items-start">
        {/* Avatar */}
        <div className="mr-4 rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
          {comment.avatar ? (
            <img src={comment.avatar} alt={comment.author} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center text-xl font-medium">
              {comment.author.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Comment Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="text-base font-medium">{comment.author}</h4>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          
          {/* Rating */}
          <div className="flex mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-4 w-4",
                  star <= comment.rating 
                  ? "text-neon-yellow fill-neon-yellow" 
                  : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          
          {/* Comment */}
          <p className="text-sm mb-3">{comment.content}</p>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 text-xs",
                liked ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"
              )}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{likeCount}</span>
            </button>
            
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface ReviewCommentsProps {
  reviewSlug: string
}

export default function ReviewComments({ reviewSlug }: ReviewCommentsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <div ref={ref} className="pt-8 border-t border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">User Reviews</h2>
          <div className="text-sm text-muted-foreground">
            {mockComments.length} reviews
          </div>
        </div>
        
        {/* Comments List */}
        <div className="mb-8">
          {mockComments.map((comment, index) => (
            <CommentItem key={comment.id} comment={comment} index={index} />
          ))}
        </div>
        
        {/* Comment Form */}
        <CommentForm reviewSlug={reviewSlug} />
      </motion.div>
    </div>
  )
}
