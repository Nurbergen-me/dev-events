import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

// Define the shape of route params
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET handler to fetch an event by its slug
 * @param request - The incoming Next.js request object
 * @param context - Contains route parameters (slug)
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Await the params object (required in Next.js 15+)
    const { slug } = await params;

    // Validate slug parameter
    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug parameter is required and must be a valid string',
        },
        { status: 400 }
      );
    }

    // Sanitize slug: ensure it's URL-safe
    const sanitizedSlug = slug.trim().toLowerCase();

    if (sanitizedSlug.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug cannot be empty',
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(sanitizedSlug)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid slug format. Only lowercase letters, numbers, and hyphens are allowed',
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Query the Event model by slug
    // Use lean() for better performance as we don't need Mongoose document methods
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: `Event with slug "${sanitizedSlug}" not found`,
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        success: true,
        event: event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Error fetching event by slug:', error);

    // Handle mongoose-specific errors
    if (error instanceof Error) {
      // Handle mongoose validation errors
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation error occurred',
            details: error.message,
          },
          { status: 400 }
        );
      }

      // Handle mongoose cast errors (e.g., invalid ObjectId format)
      if (error.name === 'CastError') {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid data format',
          },
          { status: 400 }
        );
      }
    }

    // Handle generic/unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while fetching the event',
      },
      { status: 500 }
    );
  }
}