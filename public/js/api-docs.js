/**
 * @fileoverview JavaScript API Documentation for Muscles & Balance
 * @author Muscles & Balance Team
 * @version 1.0.0
 */

/**
 * @namespace MusclesAndBalance
 * @description Main application namespace containing all modules
 */

/**
 * @namespace MusclesAndBalance.Workout
 * @description Workout plan generation and management
 */

/**
 * @namespace MusclesAndBalance.Nutrition
 * @description Nutrition calculation and meal planning
 */

/**
 * @namespace MusclesAndBalance.Supplements
 * @description Supplement recommendations and tracking
 */

/**
 * @namespace MusclesAndBalance.Utils
 * @description Utility functions and helpers
 */

/**
 * @typedef {Object} WorkoutPlan
 * @property {string} name - Workout plan name
 * @property {string} duration - Session duration
 * @property {string} frequency - Weekly frequency
 * @property {string} description - Plan description
 * @property {Exercise[]} exercises - Array of exercises
 */

/**
 * @typedef {Object} Exercise
 * @property {string} name - Exercise name
 * @property {string} video - Video URL for demonstration
 * @property {string} [reps] - Number of repetitions
 * @property {string} [duration] - Exercise duration
 */

/**
 * @typedef {Object} NutritionData
 * @property {number} calories - Daily calorie requirement
 * @property {number} protein - Protein in grams
 * @property {number} carbs - Carbohydrates in grams
 * @property {number} fats - Fats in grams
 */

/**
 * @typedef {Object} UserProfile
 * @property {number} age - User age
 * @property {string} gender - User gender
 * @property {number} weight - User weight
 * @property {number} height - User height
 * @property {string} goal - Fitness goal
 * @property {string} activityLevel - Activity level
 */

/**
 * @typedef {Object} SupplementRecommendation
 * @property {string} name - Supplement name
 * @property {string} dosage - Recommended dosage
 * @property {string} timing - When to take
 * @property {string} reason - Why it's recommended
 */

// Global API functions documentation

/**
 * Generate personalized workout plan
 * @memberof MusclesAndBalance.Workout
 * @function getWorkoutPlan
 * @global
 * @returns {void}
 */

/**
 * Calculate daily calorie and macro requirements
 * @memberof MusclesAndBalance.Nutrition
 * @function calculateCaloriesAndMacros
 * @global
 * @returns {void}
 */

/**
 * Generate supplement recommendations
 * @memberof MusclesAndBalance.Supplements
 * @function calculateRecommendation
 * @global
 * @returns {void}
 */

/**
 * Export nutrition data to PDF
 * @memberof MusclesAndBalance.Nutrition
 * @function exportToPDF
 * @global
 * @returns {void}
 */

/**
 * Filter recipe results
 * @memberof MusclesAndBalance.Nutrition
 * @function filterRecipes
 * @global
 * @returns {void}
 */

/**
 * Redirect to specific section
 * @memberof MusclesAndBalance.Utils
 * @function redirectToSection
 * @global
 * @param {HTMLElement} button - Button element with data-target
 * @returns {void}
 */

/**
 * Open share modal
 * @memberof MusclesAndBalance.Utils
 * @function openModal
 * @global
 * @returns {void}
 */

/**
 * Close share modal
 * @memberof MusclesAndBalance.Utils
 * @function closeModal
 * @global
 * @returns {void}
 */

/**
 * Copy link to clipboard
 * @memberof MusclesAndBalance.Utils
 * @function copyLink
 * @global
 * @returns {void}
 */

/**
 * Share content on social platforms
 * @memberof MusclesAndBalance.Utils
 * @function share
 * @global
 * @param {string} platform - Platform name (facebook, twitter, whatsapp, linkedin)
 * @returns {void}
 */